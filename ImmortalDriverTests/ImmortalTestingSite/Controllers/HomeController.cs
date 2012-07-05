using System.Web.Mvc;

namespace ImmortalTestingSite.Controllers
{
	public class HomeController : Controller
	{
		//[NoCache]
		public ActionResult Index()
		{
			ViewBag.Message = "Welcome to ASP.NET MVC!";

			return View();
		}

		public ActionResult About()
		{
			return View();
		}
	}
}
