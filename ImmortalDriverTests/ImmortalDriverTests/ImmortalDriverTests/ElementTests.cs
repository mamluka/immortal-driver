using NUnit.Framework;

namespace ImmortalDriver.ImmortalDriverTests
{
	/// <summary>
	/// Tests that invoke actions on page elements
	/// POST /session/:sessionId/element/active - get the currently focused element on the page
	/// GET /session/:sessionId/element/:id - get element description
	/// POST /session/:sessionId/element/:id/element - search for an element on the page starting from a specific element
	/// POST /session/:sessionId/element/:id/elements - search for multiple elements on the page starting at the specific element
	/// POST /session/:sessionId/element/:id/click - click on an element
	/// POST /session/:sessionId/element/:id/submit - submit a form element
	/// GET /session/:sessionId/element/:id/text - gets the visible text for an element
	/// POST /session/:sessionId/element/:id/value - send sequence of key strokes to a certain element
	/// POST /session/:sessionId/keys - send sequence of key strokes to the active element
	/// GET /session/:sessionId/element/:id/name - query for an elements tag name
	/// POST /session/:sessionId/element/:id/clear - clear a textarea or input element
	/// GET /session/:sessionId/element/:id/selected - check if an OPTION element, or an INPUT element of type checkbox or radiobutton is currently selected
	/// GET /session/:sessionId/element/:id/enabled - check if an element is currently enabled
	/// GET /session/:sessionId/element/:id/attribute/:name - get an element's attribute value
	/// GET /session/:sessionId/element/:id/equals/:other - check if two id's refer to the same DOM element
	/// GET /session/:sessionId/element/:id/displayed - check if an element is currently displayed
	/// GET /session/:sessionId/element/:id/location - get an elements location on the page
	/// GET /session/:sessionId/element/:id/location_in_view - check if an element is in view
	/// GET /session/:sessionId/element/:id/size - get elements size (in pixels)
	/// GET /session/:sessionId/element/:id/css/:propertyName - query elements computed css value
	/// </summary>
	[TestFixture]
	public class ElementTests
	{
		 
	}
}