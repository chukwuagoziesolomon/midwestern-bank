const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://midwestern-bank-backend.onrender.com/api';

// Import the loading context (we'll handle this carefully to avoid circular imports)
let loadingSetter: ((loading: boolean) => void) | null = null;
let messageSetter: ((message: string) => void) | null = null;

export const setLoadingCallbacks = (
  setLoading: (loading: boolean) => void,
  setMessage: (message: string) => void
) => {
  loadingSetter = setLoading;
  messageSetter = setMessage;
};

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

interface SignupResponse {
  message: string;
  password: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Show loading
    if (loadingSetter) {
      loadingSetter(true);
      if (messageSetter) {
        messageSetter('Processing your request...');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'An error occurred' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error' };
    } finally {
      // Hide loading
      if (loadingSetter) {
        loadingSetter(false);
      }
    }
  }

  // Authentication
  async signup(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<SignupResponse>> {
    return this.request<SignupResponse>('/signup/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Transfers
  async getTransfers(userId: number) {
    return this.request(`/transfers/?user_id=${userId}`);
  }

  async createTransfer(transferData: {
    user_id: number;
    transfer_type: 'local' | 'international';
    receiver_name: string;
    receiver_bank: string;
    receiver_account_number: string;
    routing_number?: string;
    receiver_bank_address?: string;
    iban?: string;
    swift_code?: string;
    amount: number;
    description: string;
    pin: string;
  }) {
    return this.request('/transfers/', {
      method: 'POST',
      body: JSON.stringify(transferData),
    });
  }

  // Settings
  async getSettings(userId: number) {
    return this.request(`/settings/?user_id=${userId}`);
  }

  async updatePassword(passwordData: {
    user_id: number;
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) {
    return this.request('/settings/', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Deposit
  async deposit(depositData: {
    user_id: number;
    card_number: string;
    card_expiry: string;
    card_cvc: string;
    deposit_amount: number;
    card_holder_name: string;
  }) {
    return this.request('/deposit/', {
      method: 'POST',
      body: JSON.stringify(depositData),
    });
  }

  // Dashboard
  async getDashboardStats(userId: number) {
    return this.request(`/dashboard/?user_id=${userId}`);
  }

  // Card Details
  async getCardDetails(userId: number) {
    return this.request(`/card/?user_id=${userId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);