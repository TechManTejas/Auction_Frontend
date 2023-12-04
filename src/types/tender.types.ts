export interface ITender {
    _id: string;
    title: string;
    description: string;
    estCost: number;
    timeToComplete: string;
    city: string;
    bidEndsOn: string;
    status: string;
    handleDeleteConfirmation?: (id: string) => void;
    handleEditCoupon?: (id: string) => void;
}

export interface TenderFormData {
    _id: string;
    companyName: string;
    experience: string;
    quoteAmount: number;
    panNumber: string;
    gstNumber: string;
    incomeProof: string;
    itReturnOrBankStatement: string;
    projectDetails1: string;
    projectDetails2: string;
    projectDetails3: string;
}