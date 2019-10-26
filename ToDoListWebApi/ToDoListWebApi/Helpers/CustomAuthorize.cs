using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;

namespace ToDoListWebApi.Helpers
{
    public class ValidateModelAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response.Headers.Add("customHeader", "custom value date time");
        }
    }


    public class CustomAuthorize : System.Web.Http.AuthorizeAttribute
    {
        //protected override bool IsAuthorized(HttpActionContext actionContext)
        //{
        //    bool isAuthorized = base.IsAuthorized(actionContext);
        //    bool isRequestHeaderOk = false;
        //    return isAuthorized && isRequestHeaderOk;
        //}

        //public override void OnAuthorization(HttpActionContext actionContext)
        //{
        //    if (actionContext == null)
        //    {
        //        //throw Error.ArgumentNull("actionContext");
        //    }

        //    if (SkipAuthorization(actionContext))
        //    {
        //        return;
        //    }

        //    if (!IsAuthorized(actionContext))
        //    {
        //        HandleUnauthorizedRequest(actionContext);
        //    }
        //}

        //protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        //{
        //    Debug.WriteLine("Running HandleUnauthorizedRequest in CustomAuthorizationFilterAttribute as principal is not authorized.");
        //    base.HandleUnauthorizedRequest(actionContext);
        //}


        private string _reason = "";
        public bool ByPassAuthorization { get; set; }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden);
            if (!string.IsNullOrEmpty(_reason))
                actionContext.Response.ReasonPhrase = _reason;

        }

        private IEnumerable<CustomAuthorize> GetApiAuthorizeAttributes(HttpActionDescriptor descriptor)
        {
            return descriptor.GetCustomAttributes<CustomAuthorize>(true)
                .Concat(descriptor.ControllerDescriptor.GetCustomAttributes<CustomAuthorize>(true));
        }

        private bool IsSecuredApiCallRequested(HttpActionContext actionContext)
        {
            var apiAttributes = GetApiAuthorizeAttributes(actionContext.ActionDescriptor);
            if (apiAttributes != null && apiAttributes.Any())
                return true;
            return false;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (IsSecuredApiCallRequested(actionContext))
            {

                var queryParams = actionContext.Request.GetQueryNameValuePairs();
                if (queryParams.Any(x => x.Key.ToLower() == "requestToken") && queryParams.Any(x => x.Key.ToLower() == "epoch"))
                {
                    this.HandleUnauthorizedRequest(actionContext);
                    _reason = "Invalid Request , No RequestToken and Epoch";
                }
                else
                {
                    base.OnAuthorization(actionContext);
                }
            }
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (ByPassAuthorization || GetApiAuthorizeAttributes(actionContext.ActionDescriptor).Any(x => x.ByPassAuthorization))
                return true;

            if (!this.IsValidRequestTokenWithEpoch(actionContext.Request.GetQueryNameValuePairs()))
            {
                this.HandleUnauthorizedRequest(actionContext);
                _reason = "Invalid Epoch or RequestToken, Access Denied";
                return false;
            }
            return base.IsAuthorized(actionContext);
        }

        private bool IsValidRequestTokenWithEpoch(IEnumerable<KeyValuePair<string, string>> QueryParams)
        {
            throw new NotImplementedException();
        }
    }
}
