import TopBar from '@/components/TopBar/TopBar';
import Workspace from '@/components/Workspace/Workspace';
import React from 'react';

type ProblemPageProps = {

};

const ProblemPage: React.FC<ProblemPageProps> = () => {

    return <div>
        <TopBar problemPage={true} />
        <Workspace />
    </div>
}
export default ProblemPage;