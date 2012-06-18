using NUnit.Framework;
using OpenQA.Selenium;

namespace ImmortalDriver.ImmortalDriverTests
{
	/// <summary>
	/// Tests for basic browser navigation
	/// GET /session/:Id/url
	/// POST /session/:Id/url
	/// POST /session/:Id/forward
	/// POST /session/:Id/back
	/// POST /session/:Id/refresh
	/// </summary>
	[TestFixture]
	public class BrowserNavigationTests
	{
		private ImmortalWebDriver _immortalDriver;
		private IWebDriver _webDriver;
		
		// /session	- requests to start a new session
		// /session/:sessionId - retrieves the sessions browser capailities
		[TestFixtureSetUp]
		public void TestFixtureSetUp()
		{
			_immortalDriver = new ImmortalWebDriver();
			_webDriver = _immortalDriver.StartDriver();
		}

		// DELETE /session/:sessionId - closes the session
		[TestFixtureTearDown]
		public void TestFixtureTearDown()
		{
			_immortalDriver.CloseDriver();
		}

		// POST /session/:sessionId/:url - navigate to a certain url
		// GET /session/:sessionId/:url - retrieve the current url
		[Test]
		public void NavigateToUrl_RetrieveCorrectUrl()
		{
			const string url = "http://www.google.com";
			_webDriver.Navigate().GoToUrl(url);
			Assert.That(_webDriver.Url, Is.StringStarting(url));
		}

		// POST /session/:sessionId/back - navigates back in the browsers history
		[Test]
		public void NavigateBack_RetrievePreviousPage()
		{
			const string firstUrl = "http://www.google.com";
			const string secondUrl = "http://www.bing.com";
			_webDriver.Navigate().GoToUrl(firstUrl);
			_webDriver.Navigate().GoToUrl(secondUrl);
			_webDriver.Navigate().Back();
			Assert.That(_webDriver.Url, Is.StringStarting(firstUrl));
		}

		// POST /session/:sessionId/forward - navigates forward in the browsers history
		[Test]
		public void NavigateForward_NavigatesForward()
		{
			const string firstUrl = "http://www.google.com";
			const string secondUrl = "http://www.bing.com";
			_webDriver.Navigate().GoToUrl(firstUrl);
			_webDriver.Navigate().GoToUrl(secondUrl);
			_webDriver.Navigate().Back();
			_webDriver.Navigate().Forward();
			Assert.That(_webDriver.Url, Is.StringStarting(secondUrl));
		}

		// POST /session/:sessionId/refresh - refreshes the current page
		[Test]
		public void RefreshPage_PageWasRefreshed()
		{
			// TODO: not sure this is the best test for refreshing, maybe we can check some kind of timestamp to make sure
			const string url = "http://www.google.com";
			_webDriver.Navigate().GoToUrl(url);
			_webDriver.Navigate().Refresh();
			Assert.That(_webDriver.Url, Is.StringStarting(url));
		}
	}
}