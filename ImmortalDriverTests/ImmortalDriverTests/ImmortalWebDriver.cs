using System;
using System.Configuration;
using System.Diagnostics;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
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
		private Process _phantomjs;

		// This is just used to test the unit tests we write.
		// When adding a new unit test :
		// 1. Make sure they pass when setting this to FireFoxDriver
		// 2. Make sure the test at first fails when changing this to ImmortalDriver, before implementing
		public TestDrivers TestDriver
		{
			//get { return TestDrivers.ImmortalDriver; }
			get { return TestDrivers.FireFoxDriver; }
		}

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
			if (TestDriver == TestDrivers.FireFoxDriver)
			{
				_immortalDriver = CreateFireFoxDriver();
				return _immortalDriver;
			}

			// open phantomJS
			_phantomjs = new Process {
				StartInfo = {
					FileName = PhantomJsExe,
			        Arguments = string.Format("{0} {1} {2}", ImmortalServerScript, CasperJsLibrary, ImmortalServerPort)
				}
			};
			//browser.StartInfo.UseShellExecute = false;
			//browser.StartInfo.RedirectStandardOutput = true;
			_phantomjs.Start();

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
				_phantomjs.Close();
				throw;
			}

			return _immortalDriver;
		}

		public void CloseDriver()
		{
			if (TestDriver == TestDrivers.FireFoxDriver)
			{
				_immortalDriver.Close();
				_immortalDriver.Dispose();
				return;
			}

			_phantomjs.CloseMainWindow();
			_phantomjs.Dispose();
		}

		private IWebDriver CreateFireFoxDriver()
		{
			var fireFoxBinary = new FirefoxBinary(ConfigurationManager.AppSettings["firefox-binary"]);
			var fireFoxProfile = new FirefoxProfile(ConfigurationManager.AppSettings["firefox-profile"]);
			
			var fireFoxDriver = new FirefoxDriver(fireFoxBinary, fireFoxProfile);

			return fireFoxDriver;
		}
	}
}