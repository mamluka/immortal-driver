using NUnit.Framework;

namespace ImmortalDriverTests.Tests
{
	/// <summary>
	/// Tests for some basic browser actions
	/// POST /session/:sessionId/execute - execute js code
	/// POST /session/:sessionId/execute_async - execute js code asynchronously
	/// POST /session/:sessionId/screenshot - take a screenshot of the browser viewport
	/// POST /session/:sessionId/frame - change focus to another frame on the page
	/// POST /session/:sessionId/window - change focus to another window on the screen
	/// DELETE /session/:sessionId/window - close the current window
	/// POST /session/:sessionId/window/:windowHandle/size - change the size of a window
	/// GET /session/:sessionId/window/:windowHandle/size - get the size of a certain window
	/// POST /session/:sessionId/window/:windowHandle/position - change the position of a certain window
	/// GET /session/:sessionId/window/:windowHandle/position - get the position of a certain window
	/// POST /session/:sessionId/window/:windowHandle/maximize - maximize a certain window
	/// GET /session/:sessionId/source - get the page source
	/// GET /session/:sessionId/title - get the title of the page
	/// </summary>
	[TestFixture]
	public class BrowserActionsTests : TestBase
	{
		[SetUp]
		protected override void SetUp()
		{
			base.SetUp();
			WebDriver.Navigate().GoToUrl(TestSiteUrl);
		}

		// GET /session/:sessionId/title
		[Test]
		public void BrowseToPage_RequestForTitle_RetrieveTitle()
		{
			Assert.That(WebDriver.Title, Is.StringStarting("Home Page"));	
		}

		// GET /session/:sessionId/source
		[Test]
		public void BrowseToPage_RequestForSource_RetrievePageSource()
		{
			var pageSource = WebDriver.PageSource;
			Assert.That(pageSource, Is.StringStarting("<!DOCTYPE html>"));
			Assert.That(pageSource.Trim(), Is.StringEnding("</html>"));
		}
	}
}