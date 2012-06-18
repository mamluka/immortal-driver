using NUnit.Framework;
using OpenQA.Selenium;

namespace ImmortalDriver.ImmortalDriverTests
{
	/// <summary>
	/// Tests for finding elements on the page
	/// POST /session/:sessionId/element
	/// POST /session/:sessionId/elements
	/// </summary>
	public class FindElementsTests
	{
		private ImmortalWebDriver _immortalDriver;
		private IWebDriver _webDriver;

		private const string url = "http://www.gooogle.com";

		// /session	- requests to start a new session
		// /session/:sessionId - retrieves the sessions browser capailities
		[TestFixtureSetUp]
		public void TestFixtureSetUp()
		{
			_immortalDriver = new ImmortalWebDriver();
			_webDriver = _immortalDriver.StartDriver();
		}

		[SetUp]
		public void SetUp()
		{
			_webDriver.Navigate().GoToUrl(url);
		}

		// DELETE /session/:sessionId - closes the session
		[TestFixtureTearDown]
		public void TestFixtureTearDown()
		{
			_immortalDriver.CloseDriver();
		}

		// POST /session/:sessionId/element - get a specific element
		[Test]
		public void GetElementOnPageByCssSelector_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.CssSelector("body div#main div#hplogo"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByClassName_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.ClassName("gbqfba"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageById_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.Id("gbqfba"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByName_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.Name("btnK"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByLinkText_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.LinkText("About Google"));
			Assert.That(element.Text, Is.EqualTo("About Google"));
		}
		[Test]
		public void GetElementOnPageByPartialLinkText_ReturnsTheRequestedElement()
		{
			var element = _webDriver.FindElement(By.PartialLinkText("About "));
			Assert.That(element.Text, Is.EqualTo("About Google"));
		}
		[Test]
		public void GetElementOnPageByTagName_ReturnsTheRequestedElement()
		{
			// TODO: not sure about this test...
			//var element = _webDriver.FindElement(By.TagName(""))
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetElementOnPageByXPath_ReturnsTheRequestedElement()
		{
			// TODO: write a nice xpath to test for this... :)
			Assert.Fail("Test not implemented yet...");
		}

		// POST /session/:sessionId/elements - retrieves list of multiple elements
		[Test]
		public void GetMultipleElementsFromPageByCssSelector_ReturnsListOfElements()
		{
			var elements = _webDriver.FindElements(By.CssSelector("div#main div"));
			Assert.That(elements, Is.Not.Empty);
		}
		[Test]
		public void GetMultipleElementsFromPageByClassName_ReturnsListOfElements()
		{
			var elements = _webDriver.FindElements(By.ClassName("gbqfba"));
			Assert.That(elements, Is.Not.Empty);
		}
		[Test]
		public void GetMultipleElementsFromPageById_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetMultipleElementsFromPageByName_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetMultipleElementsFromPageByLinkText_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetMultipleElementsFromPageByPartialLinkText_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetMultipleElementsFromPageByTagName_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
		[Test]
		public void GetMultipleElementsFromPageByXPath_ReturnsListOfElements()
		{
			Assert.Fail("Test not implemented yet...");
		}
	}
}