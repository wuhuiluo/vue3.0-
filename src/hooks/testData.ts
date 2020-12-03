export interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createAt: string;
    columnId: number;
}
export interface ColumnProps {
    id: number;
    title: string;
    avatar?: string;
    description: string;
}
export const testData: ColumnProps[] = [
    {
      id: 1,
      title: "test1的专栏",
      description: "123456",
      avatar:
        "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
    },
    {
      id: 2,
      title: "test1的专栏",
      description: "123456",
      avatar:
        "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
    },
    {
      id: 3,
      title: "test1的专栏",
      description: "123456",
      avatar:
        "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
    },
    {
      id: 4,
      title: "test1的专栏",
      description: "123456",
      avatar:
        "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
    }
  ];
export const testPosts: PostProps[] = [
    {
        id: 1,
        title: '这是我的第一篇文章',
        content: '"this is a new post you very will need"',
        image: "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
        createAt: '2020-06-11 10:34:22',
        columnId: 1
    },
    {
        id: 2,
        title: '这是我的第一篇文章',
        content: '"this is a new post you very will need"',
        image: "http://p1.music.126.net/_XO81VG4q6Ssq-ByQ27j-g==/109951164436342667.jpg",
        createAt: '2020-06-11 10:34:22',
        columnId: 1
    }
]