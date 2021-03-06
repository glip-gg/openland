/*
    Modal conatiner for wrapper to all modals
    - position relative to attach the static filer panel to bottom
    - height capped at 696
    - width capped at 584
    - padding 24
*/ 
export default function ModalContainer(props: any) {    

    

    return (
        <div style={{
            overflow: 'scroll',
            maxWidth: 584,
            minWidth: 200,
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            position: 'relative',
            padding: 24,
            paddingTop: 0,
            paddingBottom: 75,
        }}>
            {props.children}
        </div>
    );
}
