import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Comment } from "@/types"

interface CommentListProps {
    comments: Comment[];
    onLike: (commentId: string) => void;
  }
  

export function CommentList({ comments, onLike }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-muted p-3 rounded-lg">
              <div className="font-semibold text-sm">{comment.author.name}</div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-primary"
                onClick={() => onLike(comment.id)}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                <Reply className="w-4 h-4 mr-1" />
                Reply
              </Button>
              <span className="text-xs">{formatDistanceToNow(comment.createdAt)} ago</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

