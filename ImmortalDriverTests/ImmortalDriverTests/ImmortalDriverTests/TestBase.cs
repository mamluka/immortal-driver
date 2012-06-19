using NUnit.Framework;
using OpenQA.Selenium;

namespace ImmortalDriver.ImmortalDriverTests
{
	public abstract class TestBase
	{
		public IWebDriver WebDriver;

		private ImmortalWebDriver _immortalDriver;
		private DevelopmentServer _devServer;

		public string TestSiteUrl
		{
			get { return "http://localhost:" + DevelopmentServer.Port; }
		}

		[TestFixtureSetUp]
		public void TestFixtureSetUp()
		{
			_immortalDriver = new ImmortalWebDriver();
			WebDriver = _immortalDriver.StartDriver();

			_devServer = new DevelopmentServer();
		}

		[TestFixtureTearDown]
		public void TestFixtureTearDown()
		{
			_immortalDriver.CloseDriver();

			_devServer.Dispose();
		}
	}
}