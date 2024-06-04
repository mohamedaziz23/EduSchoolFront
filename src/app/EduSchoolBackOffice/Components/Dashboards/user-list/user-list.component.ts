import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User, UserService } from 'src/app/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  error: string | null = null;
  displayedColumns: string[] = ['email', 'nom', 'prenom', 'role', 'isApproved', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.error = 'Failed to load users';
        console.error('There was an error!', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(id: any): void {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 2000,
        });
        this.ngOnInit(); // Reload users after deletion
      },
      (error) => {
        console.error('Error deleting user', error);
        this.snackBar.open('Error deleting user', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  approveUser(userId: number): void {
    this.userService.approveUser(userId).subscribe(
      () => {
        this.snackBar.open('User approved successfully', 'Close', {
          duration: 2000,
        });
        this.ngOnInit(); // Reload users after approval
      },
      (error) => {
        this.error = 'Failed to approve user';
        console.error('Error approving user', error);
        this.snackBar.open('Error approving user', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  rejectUser(userId: number): void {
    this.userService.rejectUser(userId).subscribe(
      () => {
        this.snackBar.open('User rejected successfully', 'Close', {
          duration: 2000,
        });
        this.ngOnInit(); // Reload users after rejection
      },
      (error) => {
        this.error = 'Failed to reject user';
        console.error('Error rejecting user', error);
        this.snackBar.open('Error rejecting user', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const col = ['Email', 'Nom', 'Prénom', 'Rôle', 'Approuvé'];
    const rows: any[] = [];

    this.users.forEach(user => {
      const temp = [
        user.email,
        user.nom,
        user.prenom,
        user.role,
        user.isApproved ? 'Oui' : 'Non'
      ];
      rows.push(temp);
    }); (doc as any).autoTable({
      head: [col],
      body: rows,
    });

    doc.save('users.pdf');
  }
}



