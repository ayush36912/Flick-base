import { EditorContent, useEditor, BubbleMenu, FloatingMenu}  from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '../../styles/tiptap.scss';
import { useEffect } from 'react';

// import { generateHTML } from '@tiptap/html'


const Tiptap = ({setEditorState,editorContent=''}) => {
    // const output = useMemo(() => {
    //     return generateHTML(json, [
    //       Document,
    //       Paragraph,
    //       Text,
    //       Bold,
    //       // other extensions …
    //     ])
    //   }, [json])


    const editor = useEditor({
        content:editorContent,
        extensions:[StarterKit],
        onUpdate:({editor})=>{
           // console.log(editor.getHTML())
           setEditorState(editor.getHTML())
        }
    })

    // useEffect(()=>{
    //   if(editor){
    //     console.log(editor.commands)
    //   }
    // },[editor])

    return(
        <>

<div>
    {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
      </FloatingMenu>}
    </div>
        
        <span>
            <EditorContent editor={editor}/>
        </span>

        </>
    )
}

export default Tiptap;