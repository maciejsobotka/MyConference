using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyConference.Startup))]
namespace MyConference
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
