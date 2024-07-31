﻿/**
 * User type
 * @property {number} id - User id
 * @property {string} username - User username
 * @property {string} email - User email
 * @property {boolean} isAdmin - User admin status
 * @property {string} avatarUrl - User avatar url
 */
export type User = {
    id?: number | null;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
    avatarUrl?: string;
}

/**
 * Login request type
 * @property {string} email - User email
 * @property {string} password - User password
 */
export type LoginRequest = {
    email: string;
    password: string;
}


/**
 * TrainingSessionResponse type
 * @property {string} trainingDate - Date of the training session
 * @property {string} description - Description of the training session
 * @property {number} capacity - Capacity of the training session
 * @property {number} duration - Duration of the training session
 * @property {string} status - Status of the training session
 * @property {number} instructorId - ID of the instructor
 * @property {number[]} studentIds - IDs of the students
 */
export type TrainingSessionResponse = {
    /** Format: date-time */
    trainingDate: string;
    description: string;
    /** Format: int32 */
    capacity: number;
    /** Format: int32 */
    duration: number;
    status: string;
    /** Format: int32 */
    instructorId: number;
    /** Format: int32[] */
    studentIds: number[];
};

/**
 * SharedVideo type
 * @property {number || null} id - ID
 * @property {string || null} videoId - Video ID
 * @property {string || null} title - Title
 * @property {string || null} description - Description
 * @property {string || null} embedLink - Embed Link
 * @property {SharedBy || null} sharedBy - Shared By
 */
export type SharedVideo = {
    id?: number;
    videoId?: string;
    title?: string;
    description?: string;
    embedLink?: string;
    sharedBy?: SharedBy | null;
};

/**
 * SharedBy type
 * @property {string || null} userId - User ID
 * @property {string || null} username - Username
 */
export type SharedBy = {
    userId?: string;
    username?: string;
};

