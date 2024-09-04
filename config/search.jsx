import axios from "axios"

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3"


export const getYoutubeResult =async (query) => {
    const params = {
        part : 'snippet',
        q:query,
        maxResults : 1,
        type : 'video',
        key : process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }

    const resp = await axios.get(YOUTUBE_BASE_URL+"/search",{params})
    console.log(resp)
    return resp.data.items;
}

// {
//     "kind": "youtube#searchListResponse",
//     "etag": "iktVP_TKH_5oy-JRFCwj1uIzt3A",
//     "nextPageToken": "CAIQAA",
//     "regionCode": "IN",
//     "pageInfo": {
//       "totalResults": 1000000,
//       "resultsPerPage": 2
//     },
//     "items": [
//       {
//         "kind": "youtube#searchResult",
//         "etag": "ws2y0YqGUIn6iGL7zbT999NF8LY",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLu0W_9lII9agwh1XjRt242xIpHhPT2llg"
//         },
//         "snippet": {
//           "publishedAt": "2022-11-28T08:39:03Z",
//           "channelId": "UCeVMnSShP_Iviwkknt83cww",
//           "title": "Python for Beginners (Full Course) | #100DaysOfCode Programming Tutorial in Hindi",
//           "description": "Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/7wnove7K-ZQ/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/7wnove7K-ZQ/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/7wnove7K-ZQ/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "CodeWithHarry",
//           "liveBroadcastContent": "none",
//           "publishTime": "2022-11-28T08:39:03Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "dKkL0TuOJtUTyvnHbRnewINKnKU",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLdo5W4Nhv31bZSiqiOL5ta39vSnBxpOPT"
//         },
//         "snippet": {
//           "publishedAt": "2022-08-25T09:51:52Z",
//           "channelId": "UCM-yUTYGmrNvKOCcAl21g3w",
//           "title": "Python - Basic to Advance",
//           "description": "",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/6i3EGqOBRiU/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/6i3EGqOBRiU/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/6i3EGqOBRiU/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Jenny's Lectures CS IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2022-08-25T09:51:52Z"
//         }
//       }
//     ]
//   }
  