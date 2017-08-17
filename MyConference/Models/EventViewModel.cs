﻿using MyConferenceModels;

namespace MyConference.Models
{
    /// <summary>
    /// Model returning a custom representation of a Event for display purposes.
    /// This may add formatted properties ready for consumption by javascript,
    /// such as formatting date objects or enum values to a good display representation.
    /// </summary>
    public class EventViewModel : Event
    {
    }

    public class EventCriteriaModel
    {
        public string Term { get; set; }
    }
}