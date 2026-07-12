import { DateTime } from "luxon"

export const getChannelJoinedDate = ({ date }: { date: Date }) => {
  return DateTime.fromJSDate(date).toFormat("'Joined' MMM d, yyyy")
}
