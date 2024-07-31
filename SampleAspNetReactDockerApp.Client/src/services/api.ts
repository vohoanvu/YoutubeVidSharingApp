﻿// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { paths } from './endpoints';
import { TrainingSessionResponse, SharedVideo } from "@/types/global.ts";

type Path = keyof paths;
type PathMethod<T extends Path> = keyof paths[T];

type RequestParams<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        parameters: unknown;
    }
    ? paths[P][M]['parameters']
    : undefined;
type ResponseType<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        responses: { 200: { schema: { [x: string]: unknown } } };
    }
    ? paths[P][M]['responses'][200]['schema']
    : undefined;

export const apiCall = <P extends Path, M extends PathMethod<P>>(
    url: P,
    method: M,
    ...params: RequestParams<P, M> extends undefined ? [] : [RequestParams<P, M>]
): Promise<ResponseType<P, M>> => {
    console.log("Inspecting url: ", url);
    console.log("Inspecting method: ", method);
    console.log("Inspecting params: ", params);
};

export async function getTrainingSessions({ currentTry = 0, jwtToken, refreshToken, hydrate }): Promise<TrainingSessionResponse[]> {
    console.log("Trying to get training session list...");
    
    const response = await fetch("api/trainingsession", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });
    console.log("Inspecting response: ", response);
    if (response.ok) {
        console.log("Training sessions fetched successfully!");
        return await response.json() as TrainingSessionResponse[];
    } else if (response.status === 401 && currentTry === 0) {
        await hydrate();
        console.log("Refresh token and try again...", refreshToken);
        return await getTrainingSessions({ currentTry: 1, jwtToken, refreshToken, hydrate });
    }
    
    throw new Error("Error fetching training sessions");
}

export async function getAllSharedVideos({currentTry = 0, jwtToken, refreshToken, hydrate}): Promise<SharedVideo[]> {
    console.log("Trying to fetch all shared videos...");
    const response = await fetch("/api/video/getall", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });

    if(response.ok) {
        console.log("Shared videos fetched successfully!");
        return await response.json() as SharedVideo[];
    } else if(response.status === 401 && currentTry === 0) {
        await hydrate();
        return await getAllSharedVideos({currentTry: 1, jwtToken, refreshToken, hydrate});
    }

    throw new Error("Error fetching shared videos");
}

export async function uploadYoutubeVideo({
    videoUrl,
    jwtToken,
    currentTry = 0,
    hydrate
}): Promise<SharedVideo> 
{
    console.log("Trying to upload YouTube video metadata...");

    const response = await fetch(`/api/video/metadata`, {
        method: 'POST',
        body: JSON.stringify({
            videoUrl: encodeURIComponent(videoUrl)
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });

    if (response.ok) {
        console.log("YouTube video metadata uploaded successfully!");
        return await response.json() as SharedVideo;
    } else if (response.status === 401 && currentTry === 0) {
        await hydrate();
        return await uploadYoutubeVideo({ videoUrl, jwtToken, currentTry: 1, hydrate });
    } else {
        const errorText = await response.text();
        throw new Error(`Error uploading YouTube video metadata: ${errorText}`);
    }
}
  