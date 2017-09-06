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

        [Route("home")]
        [Route("event")]
        [Route("login")]
        public ActionResult AppBookmarkableRoutes()
        {
            return View("NgApp");
        }
    }
}
