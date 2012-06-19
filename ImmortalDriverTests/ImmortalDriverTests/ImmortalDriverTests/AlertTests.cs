using NUnit.Framework;

namespace ImmortalDriver.ImmortalDriverTests
{
	/// <summary>
	/// Tests that are related to the browser's alert message
	/// GET /session/:sessionId/alert_text - gets the text of the currently displayed alert/confirm/prompt dialog
	/// POST /session/:sessionId/alert_text - send key strokes to the currently opened prompt dialog
	/// POST /session/:sessionId/accept_alert - accept the currently displayed alert message
	/// POST /session/:sessionId/dismiss_alert - dismiss the currently displayed alert message
	/// </summary>
	[TestFixture]
	public class AlertTests
	{
		 
	}
}