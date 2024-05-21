interface Board {
 columns: Map<TypeColumn, Column>   
}

type TypeColumn = "todo" | "inprogress" | "done";

interface Column {
    id: TypeColumn;
    todos: Todo[]
}

interface Todo {
    $id: string;
    $createdAt: string;
    title: string;
    status: string;
    image?: string;
}

interface Image {
    bucketId: string;
    fieldId: string;
}





