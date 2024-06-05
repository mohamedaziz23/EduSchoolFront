import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onEdit() {

    // Logic for editing the event
    this.dialogRef.close({ action: 'edit', event: this.data });
  }

  onDelete() {
    // Logic for deleting the event
    this.dialogRef.close({ action: 'delete', event: this.data });
  }

  onClose() {
    this.dialogRef.close();
  }
}
