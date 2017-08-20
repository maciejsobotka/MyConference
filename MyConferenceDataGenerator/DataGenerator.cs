using System;
using MyConferenceModels;

namespace MyConferenceDataGenerator
{
    internal class DataGenerator
    {
        #region Private methods

        private static void GenerateEvents()
        {
            var db = new MyConferenceDbEntities();
            var evnt = new Event
            {
                Name = "Ev1",
                Date = DateTime.Now
            };
            db.Events.Add(evnt);
            db.SaveChanges();
        }

        private static void Main(string[] args)
        {
            Console.WriteLine("1. GenerateData");
            Console.WriteLine("2. RemoveData");
            string key = Console.ReadLine();
            switch (key)
            {
                case "1":
                    GenerateEvents();
                    break;
                case "2":
                    RemoveEvents();
                    break;
            }
            Console.Read();
        }

        private static void RemoveEvents()
        {
            var db = new MyConferenceDbEntities();
            foreach (Event evnt in db.Events)
            {
                db.Events.Remove(evnt);
            }
            db.SaveChanges();
        }

        #endregion
    }
}