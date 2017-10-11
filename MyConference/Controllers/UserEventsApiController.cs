using System.Data.Entity;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using MyConferenceModels;

namespace MyConference.Controllers
{
    public class UserEventsApiController : ApiController
    {
        #region Private fields

        private readonly MyConferenceDbEntities db = new MyConferenceDbEntities();

        #endregion
        #region Overrides

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        #endregion
        #region Public methods

        // DELETE: api/UserEventsApi/5
        [ResponseType(typeof(UserEvent))]
        public IHttpActionResult DeleteUserEvent(int id)
        {
            UserEvent userEvent = db.UserEvents.Find(id);
            if (userEvent == null)
            {
                return NotFound();
            }

            db.UserEvents.Remove(userEvent);
            db.SaveChanges();

            return Ok(userEvent);
        }

        // GET: api/UserEventsApi/5
        [ResponseType(typeof(UserEvent))]
        public IHttpActionResult GetUserEvent(int id)
        {
            UserEvent userEvent = db.UserEvents.Find(id);
            if (userEvent == null)
            {
                return NotFound();
            }

            return Ok(userEvent);
        }

        // GET: api/UserEventsApi
        public IQueryable<UserEvent> GetUserEvents()
        {
            return db.UserEvents;
        }

        // POST: api/UserEventsApi
        [ResponseType(typeof(UserEvent))]
        public IHttpActionResult PostUserEvent(UserEventData userEventData)
        {
            var userId = db.Users.Where(user => user.Name == userEventData.UserName).Select(user => user.Id).FirstOrDefault();

            var userEvent = new UserEvent
            {
                UserId = userId,
                EventId = userEventData.EventId
            };

            db.UserEvents.Add(userEvent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new {id = userEvent.Id}, userEvent);
        }

        // PUT: api/UserEventsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserEvent(int id, UserEvent userEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userEvent.Id)
            {
                return BadRequest();
            }

            db.Entry(userEvent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserEventExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        #endregion
        #region Private methods

        private bool UserEventExists(int id)
        {
            return db.UserEvents.Count(e => e.Id == id) > 0;
        }

        #endregion
        #region Nested Class

        public class UserEventData
        {
            public int EventId { get; set; }
            public string UserName { get; set; }
        }

        #endregion
    }
}