import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";
import axiosInstance from "../../../Utils/axios";

// const sliceName = "QuestionAnswers";
// const types = [`getPage${sliceName}`];

// Fetch ticket inspections with pagination
export const getTicketsInspection = createAsyncThunk(
  "ticketInspection/getTicketsInspection",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getTicketsInspection(postsPerPage);
      return data;
    } catch (error) {
      console.error("Error fetching tickets inspection:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

//fetch getTicketsInspectionById

export const getTicketsInspectionById = createAsyncThunk(
  "ticketInspection/getTicketsInspectionById",
  async ({ ticketId, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const { data } = await API.getTicketsInspectionById({ ticketId, postsPerPage, page });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors?.[0]?.error || "An unknown error occurred");
    }
  }
);

export const getSpecificTicketInspection = createAsyncThunk(
  "ticketInspection/getSpecificTicketInspection",

  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getSpecificTicketInspection(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors?.[0]?.error || "An unknown error occurred");
    }
  }
);

// Fetch all ticket inspections
export const getAllTicketsInspection = createAsyncThunk(
  "ticketInspection/getAllTicketsInspection",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllTicketsInspection({ postsPerPage, page });
      return data;
    } catch (error) {
      console.error("Error fetching all ticket inspections:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// Fetch previous ticket inspections
export const getPreviousTicketsInspection = createAsyncThunk(
  "ticketInspection/getPreviousTicketsInspection",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousTicketsInspection(previous);
      return data;
    } catch (error) {
      console.error("Error fetching previous ticket inspections:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// Fetch ticket inspections for a particular page
export const getPageTicketsInspection = createAsyncThunk(
  "ticketInspection/getPageTicketsInspection",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageTicketsInspection(number, postsPerPage);
      return data;
    } catch (error) {
      console.error("Error fetching page ticket inspections:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// Create a new ticket inspection
export const createTicketsInspection = createAsyncThunk(
  "ticketInspection/createTicketsInspection",
  async (data, { rejectWithValue }) => {
    const {
      ticket,
      serialNo,
      damageStatus,
      issue,
      description,
      image,
      questionAnswers,
      signatoryName,
      signatureImage,
      signatoryContactNumber,
    } = data;

    try {
      const body = new FormData();
      body.append("ticket", ticket);
      body.append("serialNo", serialNo);
      body.append("damageStatus", damageStatus);
      body.append("issue", issue);
      body.append("description", description);
      body.append("image", image);
      body.append("questionAnswers", JSON.stringify(questionAnswers));
      body.append("signatoryName", signatoryName);
      body.append("signatureImage", signatureImage);
      body.append("signatoryContactNumber", signatoryContactNumber);

      const response = await API.createTicketsInspection(body);
      return response.data;
      // return data;
    } catch (error) {
      console.error("Error creating ticket inspection:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// get AnswerQuestion by itemId

export const getAnswerQuestionByItemId = createAsyncThunk(
  "ticketInspection/getAnswerQuestionByItemId",

  async (itemId, { rejectwithValue }) => {
    try {
      const response = await API.getAnswerQuestionByItemId(itemId);
      return response.data;
    } catch (error) {
      return rejectwithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

export const getNextQuestion = createAsyncThunk(
  "getAnswerQuestionByItemId/getNextQuestion",
  async (next, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(next);

      return {
        questions: response.data.questions,
        nextPage: response.data.nextPage,
        count: response.data.count,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "Something went wrong");
    }
  }
);

// Fetch next ticket inspections
export const getNextTicketsInspection = createAsyncThunk(
  "ticketInspection/getNextTicketsInspection",
  async (next, { rejectWithValue }) => {
    console.log(next, "thunk");
    try {
      const response = await axiosInstance.getNextTicketsInspection(next);
      return {
        ticketInspections: response.data.ticketInspections,
        
        nextPage: response.data.nextPage,
        count: response.data.count,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// Update an existing ticket inspection
export const updateTicketsInspection = createAsyncThunk(
  "ticketInspection/updateTicketsInspection",
  async (data, { rejectWithValue }) => {
    const { id, values } = data;
    const {
      ticket,
      serialNo,
      damageStatus,
      issue,
      description,
      image,
      questionAnswers,
      signatoryName,
      signatureImage,
      signatoryContactNumber,
    } = values;
    try {
      const body = new FormData();
      body.append("ticket", ticket);
      body.append("serialNo", serialNo);
      body.append("damageStatus", damageStatus);
      body.append("issue", issue);
      body.append("description", description);
      body.append("image", image);
      body.append("questionAnswers", JSON.stringify(questionAnswers));
      body.append("signatoryName", signatoryName);
      body.append("signatureImage", signatureImage);
      body.append("signatoryContactNumber", signatoryContactNumber);

      const response = await API.updateTicketsInspection(id, body);
      return response.data;
    } catch (error) {
      console.error("Error updating ticket inspection:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);

// Handle search for ticket inspections
export const handleSearchTicketsInspection = createAsyncThunk(
  "ticketInspection/handleSearchTicketsInspection",
  async (data, { rejectWithValue }) => {
    const { search, postsPerPage } = data;
    try {
      const { data } = await API.handleSearchTicketsInspection(search, postsPerPage);
      return data;
    } catch (error) {
      console.error("Error handling search for ticket inspections:", error);
      return rejectWithValue(error?.response?.data?.errors[0]?.error || "An unknown error occurred");
    }
  }
);
