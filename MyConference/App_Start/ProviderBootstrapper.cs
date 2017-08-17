using MyConference;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ProviderBootstrapper), "PreStartup")]
[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(ProviderBootstrapper), "PostStartup")]

namespace MyConference
{
    public class ProviderBootstrapper
    {
        public static void PreStartup()
        {
        }
        public static void PostStartup()
        {
        }
    }
}