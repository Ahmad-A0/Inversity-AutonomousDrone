import { Button } from '../Tools/Button';
import {
    NumberField,
    NumberFieldInput,
    NumberFieldLabel,
} from '../Tools/NumberField';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../Tools/Sheet';
import { BiRegularArrowFromLeft, BiRegularRightArrowAlt } from 'solid-icons/bi';
import ChatBot from './ChatBot';
import { estimatePathDistance } from './Path';

interface UIProps {
    coastalStart: any;
    setCoastalStart: any;
    coastalEnd: any;
    setCoastalEnd: any;
    topLeft: any;
    setTopLeft: any;
    bottomRight: any;
    setBottomRight: any;
    r1: any;
    r2: any;
    calculatePath: () => void;
}

let UI = (props: UIProps) => {
    return (
        <>
            <div class="sticky  max-w-sm bg-black bg-opacity-80 rounded-xl flex flex-col info-menu ml-auto mr-10 mt-[70vh] max-h-[30vh]">
                <h1 class="text-xl m-4 font-roboto font-bold">Route Details</h1>
                <div class="flex flex-row text-md m-4">
                    <div class="font-roboto ml-2">
                        Estimated Route Length:{' '}
                        <b>
                            {(
                                estimatePathDistance(props.r1()) +
                                estimatePathDistance(props.r2())
                            ).toFixed(2)}{' '}
                            km
                        </b>
                    </div>
                    <div class="font-roboto">
                        Estimated Route Time:{' '}
                        <b>
                            {(
                                (estimatePathDistance(props.r1()) +
                                    estimatePathDistance(props.r2())) /
                                70
                            ).toFixed(2)}{' '}
                            hours
                        </b>
                    </div>
                </div>
                <button
                    class="border-neutral-800 rounded-xl border-2 mx-5 text-lg my-7 hover:border-neutral-500 hover:bg-neutral-500 hover:text-white p-2 font-roboto font-bold"
                    onClick={props.calculatePath}
                >
                    Calculate Path
                </button>
            </div>
            <div class="fixed left-0 top-0 h-screen bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-sm flex flex-col pr-10">
                <Sheet>
                    <SheetTrigger class="my-auto">
                        <BiRegularRightArrowAlt class="ml-10 scale-[5] opacity-75 animate-pulse" />
                    </SheetTrigger>
                    <SheetContent
                        position={'left'}
                        class="bg-opacity-5 backdrop-blur-sm bg-black"
                    >
                        <SheetHeader>
                            <SheetTitle>Your route points</SheetTitle>
                            <SheetDescription>
                                Define the start and end points of your route
                            </SheetDescription>
                        </SheetHeader>
                        <div class="grid gap-4 py-4">
                            <NumberField class="grid grid-cols-4 items-center gap-4">
                                <NumberFieldLabel class="text-right">
                                    Coastal Start
                                </NumberFieldLabel>
                                <NumberFieldInput
                                    value={props.coastalStart()}
                                    class="col-span-3"
                                    type="text"
                                />
                            </NumberField>
                            <NumberField class="grid grid-cols-4 items-center gap-4">
                                <NumberFieldLabel class="text-right">
                                    Survey Top Left
                                </NumberFieldLabel>
                                <NumberFieldInput
                                    value={props.topLeft()}
                                    class="col-span-3"
                                    type="text"
                                />
                            </NumberField>
                            <NumberField class="grid grid-cols-4 items-center gap-4">
                                <NumberFieldLabel class="text-right">
                                    Survey Bottom Right
                                </NumberFieldLabel>
                                <NumberFieldInput
                                    value={props.bottomRight()}
                                    class="col-span-3"
                                    type="text"
                                />
                            </NumberField>
                            <NumberField class="grid grid-cols-4 items-center gap-4">
                                <NumberFieldLabel class="text-right">
                                    Coastal End
                                </NumberFieldLabel>
                                <NumberFieldInput
                                    value={props.coastalEnd()}
                                    class="col-span-3"
                                    type="text"
                                />
                            </NumberField>
                            <ChatBot />
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};

export default UI;
