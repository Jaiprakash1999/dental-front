import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  personalInfo: {
    firstName: "Jaiprakash",
    lastName: "Kushwaha",
    department: "Medical staff",
    role: "Admin",
    email: "Parchaa@gmail.com",
    aboutme: "Full stack developer",
    language: "Hindi, English",
    registrationNumber: "PSI2024",
  },

  professionalDetail: {
    educations: [{ school: "", degree: "", year: "" }],
    experiance: [{ title: "", type: "", location: "", year: "" }],
    specialties: [{ speciality: "" }],
    membership: [{ title: "", year: "" }],
    awards: [{ title: "", institution: "", year: "" }],
  },

  patientInteraction: {
    services: [{ serviceType: "Consultation" }],
    appointmentSlot: {
      visitType: "inVisit",
      availablityDay: [],
      sessionTimefrom: "",
      sessionTimeTo: "",
    },
    offices: [
      {
        clinicName: "Parchaa Healthcare AI",
        address: "SDA Market",
        state: "Delhi",
        city: "Delhi",
        pinCode: "123451",
        phone: "9382262211",
        email: "parchaa@gmail.com",
        inVisitFee: "1000",
        followUpFee: "0",
        teleConsultationFee: "1000",
      },
    ],
  },
};

const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState: initialState,
  reducers: {
    setPersonalInfo: (state, actions) => {
      state.personalInfo = { ...state.personalInfo, ...actions.payload };
    },
    setProfessionalDetails: (state, actions) => {
      state.professionalDetail = {
        ...state.professionalDetail,
        ...actions.payload,
      };
    },
    setPatientInteraction: (state, actions) => {
      state.patientInteraction = {
        ...state.patientInteraction,
        ...actions.payload,
      };
    },
  },
});

export const {
  setPersonalInfo,
  setPatientInteraction,
  setProfessionalDetails,
} = doctorProfileSlice.actions;

export default doctorProfileSlice.reducer;
