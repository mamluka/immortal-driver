using NUnit.Framework;
using OpenQA.Selenium;

namespace ImmortalDriver.ImmortalDriverTests
{
	/// <summary>
	/// Tests for finding elements on the page
	/// POST /session/:sessionId/element
	/// POST /session/:sessionId/elements
	/// </summary>
	[TestFixture]
	public class FindElementsTests : TestBase
	{
		[SetUp]
		public void SetUp()
		{
			WebDriver.Navigate().GoToUrl(TestSiteUrl);			
		}

		// POST /session/:sessionId/element - get a specific element
		[Test]
		public void GetElementOnPageByCssSelector_ReturnsTheRequestedElement()
		{
			var element = WebDriver.FindElement(By.CssSelector("body div#main h2"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByClassName_ReturnsTheRequestedElement()
		{
			var element = WebDriver.FindElement(By.ClassName("current-time"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageById_ReturnsTheRequestedElement()
		{
			var element = WebDriver.FindElement(By.Id("main"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByName_ReturnsTheRequestedElement()
		{
			var element = WebDriver.FindElement(By.Name("text-box-a"));
			Assert.That(element.Displayed, Is.True);
		}
		[Test]
		public void GetElementOnPageByLinkText_ReturnsTheRequestedElement()
		{
			var linkText = "http://asp.net/mvc";
			var element = WebDriver.FindElement(By.LinkText(linkText));
			Assert.That(element.Text, Is.EqualTo(linkText));
		}
		[Test]
		public void GetElementOnPageByPartialLinkText_ReturnsTheRequestedElement()
		{
			var element = WebDriver.FindElement(By.PartialLinkText("Log "));
			Assert.That(element.Text, Is.EqualTo("Log On"));
		}
		[Test]
		public void GetElementOnPageByTagName_ReturnsTheRequestedElement()
		{
			// TODO: not sure about this test...
			//var element = WebDriver.FindElement(By.TagName(""))
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
			var elements = WebDriver.FindElements(By.CssSelector("div#header div"));
			Assert.That(elements.Count, Is.GreaterThan(1));
		}
		[Test]
		public void GetMultipleElementsFromPageByClassName_ReturnsListOfElements()
		{
			var elements = WebDriver.FindElements(By.ClassName("standard-input"));
			Assert.That(elements.Count, Is.GreaterThan(1));
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