using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyConferenceModels;

namespace MyConferenceDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            MyConferenceDbEntities db = new MyConferenceDbEntities();
            Event evnt = new Event
            {
                Name = "Ev1",
                Date = DateTime.Now
            };
            db.Events.Add(evnt);
            db.SaveChanges();
        }
    }
}
