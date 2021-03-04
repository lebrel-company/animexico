import dfnsFormat from 'date-fns/format';

const formatDate = function (stamp, format) {
    return dfnsFormat(stamp, format);
}

export default formatDate;

