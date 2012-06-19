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
		[SetUp]
		public void SetUp()
		{
			WebDriver.Navigate().GoToUrl(TestSiteUrl);			
		}

		// POST /session/:sessionId/:url - navigate to a certain url
		// GET /session/:sessionId/:url - retrieve the current url
		[Test]
		public void NavigateToUrl_RetrieveCorrectUrl()
		{
			Assert.That(WebDriver.Url, Is.StringStarting(TestSiteUrl));
		}

		// POST /session/:sessionId/back - navigates back in the browsers history
		[Test]
		public void NavigateBack_RetrievePreviousPage()
		{
			WebDriver.Navigate().GoToUrl(TestSiteUrl + "/Home/About");
			WebDriver.Navigate().Back();
			Assert.That(WebDriver.Url, Is.StringContaining(TestSiteUrl));
			Assert.That(WebDriver.Url, Is.Not.Contains("/Home/About"));
		}

		// POST /session/:sessionId/forward - navigates forward in the browsers history
		[Test]
		public void NavigateForward_NavigatesForward()
		{
			WebDriver.Navigate().GoToUrl(TestSiteUrl + "/Home/About");
			WebDriver.Navigate().Back();
			WebDriver.Navigate().Forward();
			Assert.That(WebDriver.Url, Is.StringContaining("/Home/About"));
		}

		// POST /session/:sessionId/refresh - refreshes the current page
		[Test]
		public void RefreshPage_PageWasRefreshed()
		{
			var currentTime = WebDriver.Title;
			WebDriver.Navigate().Refresh();
			var newTime = WebDriver.Title;
			Assert.That(currentTime, Is.Not.EqualTo(newTime),
				"There was a problem refreshing the page, or your computer is too fast for this test!");
		}
	}
}