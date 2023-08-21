export interface RentDetails {
    id: string;
    user: User;
    title: string;
    location: string;
    description: string;
    category: string;
    rate: string;
    lease_term: string;
    lease_cost: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: null;
    image7: null;
    image8: null;
    image9: null;
    image10: null;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    full_name: string;
    bus_name: string;
    profile_image: null;
    is_verified: boolean;
    user_type: number;
}