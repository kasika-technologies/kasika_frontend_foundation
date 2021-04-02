const renderAttachments = (attachments, component) => {
    if (!attachments) return;

    attachments.forEach(attachment => {
        if (attachment.attached.includes(component)) {
            console.error(`${component.element} has attached node that it is also attached to`);
            return;
        }

        attachment.render();
    })
}

export {renderAttachments}