import { DateTime } from "luxon"

export const getChannelJoinedDate = ({ date }: { date: Date }) => {
  return DateTime.fromJSDate(date).toFormat("'Joined' MMM d, yyyy")
}

export const getVideoCreationDate = (
  date: string | Date | DateTime
): string => {
  const dt =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : date instanceof Date
        ? DateTime.fromJSDate(date)
        : date

  return dt.toRelative() ?? ""
}
