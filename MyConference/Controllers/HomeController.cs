using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyConference.Controllers
{
    [RoutePrefix("")]
    public class HomeController : Controller
    {
        [Route("")]
        public ActionResult Index()
        {
            return View("NgApp");
        }

        [Authorize]
        [Route("event-starred")]
        public ActionResult AppAuthorizedRoutes()
        {
            return View("NgApp");
        }

        [Route("home")]
        [Route("event")]
        [Route("login")]
        [Route("register")]
        public ActionResult AppNormalRoutes()
        {
            return View("NgApp");
        }
    }
}
