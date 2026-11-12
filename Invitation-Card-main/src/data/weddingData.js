import details from "./details.json";

const capitalizeInitial = (name) =>
  name ? `${name[0].toLocaleUpperCase()}${name.slice(1)}` : "";

const weddingData = {
  hero: {
    bride: capitalizeInitial(details.bride),
    groom: capitalizeInitial(details.groom),
    date: details.weddingDate,
    invitation: "",
    buttonText: "Open Invitation",
  },

  brandMonogram: details.brandMonogram || "A|S",

  invitation: {
    mantra: details.invitationMantra,
    title: details.invitationTitle,
    message: details.invitationMessage,
    brideRole: details.brideRole,
    brideParents: details.brideParents,
    groomRole: details.groomRole,
    groomParents: details.groomParents,
    date: details.date,
    time: details.time,
    venue: details.venue,
    closing: details.invitationClosing,
  },
};

export default weddingData;
