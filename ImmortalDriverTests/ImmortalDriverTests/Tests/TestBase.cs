using NUnit.Framework;
using OpenQA.Selenium;

namespace ImmortalDriverTests.Tests
{
	/// <summary>
	/// This should be used as the base class for all system tests written here.
	/// It takes care of opening the phantomjs browser and running the immortal-driver in it.
	/// 
	/// POST /session - query server's current status
	/// GET /sessions - create a new session
	/// GET /session/:sessionId - return list of currently active sessions
	/// DELETE /session/:sessionId - delete a specific session
	/// </summary>
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
			_immortalDriver.StartPhantomJs();

			_devServer = new DevelopmentServer();
		}

		[TestFixtureTearDown]
		public void TestFixtureTearDown()
		{
			_immortalDriver.CloseDriver();

			_devServer.Dispose();
		}

		protected virtual void SetUp()
		{
			WebDriver = _immortalDriver.StartWebDriver();
		}

		protected virtual void TearDown()
		{
			_immortalDriver.QuitWebDriver();
		}
	}
}