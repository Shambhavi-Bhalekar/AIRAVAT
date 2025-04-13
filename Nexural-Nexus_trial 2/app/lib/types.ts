export interface CallRequestBody {
    phoneNumber: string;
  }
  
  export interface BlandAIResponse {
    call_id: string;
    status: string;
    message?: string;
  }
