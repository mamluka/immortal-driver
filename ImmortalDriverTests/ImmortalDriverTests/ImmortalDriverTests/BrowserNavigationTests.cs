using NUnit.Framework;

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
	public class BrowserNavigationTests : TestBase
	{
		// POST /session/:sessionId/:url - navigate to a certain url
		// GET /session/:sessionId/:url - retrieve the current url
		[Test]
		public void NavigateToUrl_RetrieveCorrectUrl()
		{
			const string url = "http://www.google.com";
			WebDriver.Navigate().GoToUrl(url);
			Assert.That(WebDriver.Url, Is.StringStarting(url));
		}

		// POST /session/:sessionId/back - navigates back in the browsers history
		[Test]
		public void NavigateBack_RetrievePreviousPage()
		{
			const string firstUrl = "http://www.google.com";
			const string secondUrl = "http://www.bing.com";
			WebDriver.Navigate().GoToUrl(firstUrl);
			WebDriver.Navigate().GoToUrl(secondUrl);
			WebDriver.Navigate().Back();
			Assert.That(WebDriver.Url, Is.StringStarting(firstUrl));
		}

		// POST /session/:sessionId/forward - navigates forward in the browsers history
		[Test]
		public void NavigateForward_NavigatesForward()
		{
			const string firstUrl = "http://www.google.com";
			const string secondUrl = "http://www.bing.com";
			WebDriver.Navigate().GoToUrl(firstUrl);
			WebDriver.Navigate().GoToUrl(secondUrl);
			WebDriver.Navigate().Back();
			WebDriver.Navigate().Forward();
			Assert.That(WebDriver.Url, Is.StringStarting(secondUrl));
		}

		// POST /session/:sessionId/refresh - refreshes the current page
		[Test]
		public void RefreshPage_PageWasRefreshed()
		{
			// TODO: not sure this is the best test for refreshing, maybe we can check some kind of timestamp to make sure
			const string url = "http://www.google.com";
			WebDriver.Navigate().GoToUrl(url);
			WebDriver.Navigate().Refresh();
			Assert.That(WebDriver.Url, Is.StringStarting(url));
		}
	}
}