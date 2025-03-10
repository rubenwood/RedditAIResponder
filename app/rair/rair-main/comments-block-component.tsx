import Link from "next/link";

function RAIRComment(props: any){
    return (
        <>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <td style={{ width: "20%", fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Author</td>
                        <td style={{ width: "60%", fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Comment</td>
                        <td style={{ width: "20%", fontWeight: "bold", border: "1px solid #ddd", padding: "8px" }}>Link</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ width: "20%", border: "1px solid #ddd", padding: "8px" }}>{props.author}</td>
                        <td style={{ width: "60%", border: "1px solid #ddd", padding: "8px", wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
                            {props.body}
                        </td>
                        <td style={{ width: "20%", border: "1px solid #ddd", padding: "8px" }}>
                            <Link href={props.link}>Link</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export function RAIRCommentsBlock(props: any){

    const formatComments = () =>{
        let formattedCommentList = [];
        for(const comment of props.commentsData.comments){
            formattedCommentList.push(<RAIRComment 
                                        key={`comment-${comment.data.id}`} 
                                        author={comment.data.author} 
                                        body={comment.data.body}
                                        link={`https://reddit.com/${comment.data.permalink}`}
                                         />);
        }
        return formattedCommentList;
    }

    return (
        <div>
            {formatComments()}
        </div>
    )
}