using Microsoft.Owin;
using MyConference;
using Owin;

[assembly: OwinStartup(typeof(Startup))]
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
