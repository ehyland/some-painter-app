export default {
  EventForm: {
    name: "EventForm",
    headerText: "Create an event",
    headerTag: "h1",
    state: "pending",
    messages: [],
    inputs: {
      UserSubmittedGallery: {
        type: "text",
        label: "Gallery",
        value: ""
      },
      UserSubmittedArtistName: {
        type: "text",
        label: "Artist Name",
        value: ""
      },
      "UserSubmittedStartDate[date]": {
        type: "text",
        label: "Date (dd/mm/yyyy)",
        value: ""
      },
      "UserSubmittedStartDate[time]": {
        type: "text",
        label: "Time (6pm)",
        value: ""
      },
      UserSubmittedHasFreeDrinks: {
        type: "checkbox",
        label: "Free Drinks?",
        value: ""
      }
    },
    actions:[
      {
        name: "submit",
        type: "submit",
        text: "Submit"
      }
    ]
  }
};
