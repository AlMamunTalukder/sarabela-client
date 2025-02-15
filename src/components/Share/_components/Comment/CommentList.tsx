import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { TNews } from "@/types"
type NewsParams = {
  news: TNews
}

export function CommentList({ news }: NewsParams) {

  // const handleLike = (commentId: string) => {
  //   setComments(comments.map((comment) =>
  //     comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
  //   ));
  // };
  return (
    <div className="space-y-4">
      {news?.comments?.map((comment) => {
        return (
          <div key={comment._id} className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment?.user?.avatar} alt={comment?.user?.name} />
              <AvatarFallback>{comment?.user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted p-3 rounded-lg">
                <div className="font-semibold text-sm">{comment?.user?.name}</div>
                <p className="text-sm mt-1">{comment?.comments}</p>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-primary"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>
                <span className="text-xs">{formatDistanceToNow(new Date(comment?.createdAt))} ago</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
