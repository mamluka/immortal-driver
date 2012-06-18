using System;
using System.Configuration;
using System.Diagnostics;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace ImmortalDriver
{
	/// <summary>
	/// This is for setting up the ImmortalDriver.
	/// It opens phantomjs with the ImmortalDriver scripts needed.
	/// </summary>
	public class ImmortalWebDriver
	{
		private IWebDriver _immortalDriver;
		private ICapabilities _driverCapabilities;
		private Process phantomjs;

		public string PhantomJsExe
		{
			get { return ConfigurationManager.AppSettings["phantomjs-exe"]; }
		}
		public string CasperJsLibrary
		{
			get { return ConfigurationManager.AppSettings["casperjs-library"]; }
		}
		public string ImmortalServerScript
		{
			get { return ConfigurationManager.AppSettings["immortal-server-script"]; }
		}
		public int ImmortalServerPort
		{
			get { return Int32.Parse(ConfigurationManager.AppSettings["immortal-server-port"]); }
		}

		public IWebDriver StartDriver()
		{
			// open phantomJS
			phantomjs = new Process();
			phantomjs.StartInfo.FileName = PhantomJsExe;
			phantomjs.StartInfo.Arguments = string.Format("{0} {1} {2}",
				ImmortalServerScript, CasperJsLibrary, ImmortalServerPort);
			//browser.StartInfo.UseShellExecute = false;
			//browser.StartInfo.RedirectStandardOutput = true;
			phantomjs.Start();

			// Setup webdriver
			_driverCapabilities = new DesiredCapabilities();
			try
			{
				var serverAddress = new Uri(string.Format("http://localhost:{0}", ImmortalServerPort));
				_immortalDriver = new RemoteWebDriver(serverAddress, _driverCapabilities);
			}
			catch
			{
				//Console.WriteLine("Error : " + browser.StandardOutput.ReadToEnd());
				phantomjs.Close();
				throw;
			}

			return _immortalDriver;
		}

		public void CloseDriver()
		{
			phantomjs.Close();
			phantomjs.Dispose();
		}
	}
}