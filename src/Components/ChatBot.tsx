import { createSignal, onMount } from 'solid-js';
import { DeepChat } from 'deep-chat';
import 'deep-chat';
import dk from './e-de';

// Declare the following module for TypeScript:
// NOTE: You do not need the { ref: Partial<DeepChat> } property if you do not intend to
// access the element through its reference (elementRef)
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            'deep-chat': Partial<DeepChat> & { ref: Partial<DeepChat> };
        }
    }
}

function ChatBot() {
    const [history] = createSignal([]);
    let elementRef!: Partial<DeepChat>;
    onMount(() => {
        // You do not need to use hyphen-case for element reference properties
        elementRef.introMessage = {
            text: "I've analysed your route, and can view the relevant geographical and ecological data. Ask me anything.",
        };
    });
    return (
        <div>
            <h1 class="my-1 text-lg text-white">Talk to your route</h1>
            <deep-chat
                ref={elementRef}
                // demo and history are examples of passing an object directly into a property
                directConnection={{
                    openAI: {
                        assistant: {
                            assistant_id: 'asst_flkAjb2C35croUTAASIfy2a2',
                        },
                        key: 'api key here',
                    },
                }}
                // demo={true}
                history={history()}
                // !!!!! Make sure to use HYPHEN-CASE when setting properties directly in the markup !!!!!!!!
                // !!!!! E.g. changing textInput to text-input !!!!!!!!
                // text-input is an example of passing a data object into a property
                text-input={{ placeholder: { text: 'Ask about your route' } }}
                chatStyle={{ background: 'black', borderRadius: '0px' }}
            />
        </div>
    );
}

export default ChatBot;
