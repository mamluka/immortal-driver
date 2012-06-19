using System;
using System.Configuration;
using System.Diagnostics;

namespace ImmortalDriver
{
	public class DevelopmentServer : IDisposable
	{
		private readonly Process _devServer;

		public static int Port = 15527;
		private string _devServerExe
		{
			get
			{
				if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["dev-server-exe"]))
					return ConfigurationManager.AppSettings["dev-server-exe"];
				return @"C:\Program Files (x86)\Common Files\microsoft shared\DevServer\10.0\WebDev.WebServer40.EXE";
			}
		}
		private string _testSitePath
		{
			get
			{
				if (string.IsNullOrEmpty(ConfigurationManager.AppSettings["immortal-test-site-path"]))
					throw new Exception("Please enter the immortal test site folder path in the App.config file under the setting 'immortal-test-site-path'");
				return ConfigurationManager.AppSettings["immortal-test-site-path"];
			}
		}

		public DevelopmentServer()
		{
			_devServer = new Process {
				StartInfo = { 
					FileName = _devServerExe,
			        Arguments = string.Format("/port:{0} /path:{1}", Port, _testSitePath)
				}
			};

			try
			{
				_devServer.Start();
			}
			catch
			{
				Console.WriteLine("Unable to start development server for the immortal test site");
				throw;
			}
		}

		public void Dispose()
		{
			_devServer.Close();
			_devServer.Dispose();
		}
	}
}