using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_commercal_APi.Migrations
{
    /// <inheritdoc />
    public partial class MakeAvatarNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds");

            migrationBuilder.DropForeignKey(
                name: "FK_Returns_Users_UserId",
                table: "Returns");

            migrationBuilder.DropColumn(
                name: "Useage",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "UseageLimit",
                table: "Coupons",
                newName: "Usage");

            migrationBuilder.RenameColumn(
                name: "RedeemAt",
                table: "CouponRedemptions",
                newName: "RedeemedAt");

            migrationBuilder.RenameColumn(
                name: "OrederId",
                table: "CouponRedemptions",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "ContactMessages",
                newName: "CreatedAt");

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

            migrationBuilder.AlterColumn<decimal>(
                name: "MinOrder",
                table: "Coupons",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Coupons",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<decimal>(
                name: "MaxDiscount",
                table: "Coupons",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsageLimit",
                table: "Coupons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CouponRedemptions_OrderId",
                table: "CouponRedemptions",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_CouponRedemptions_UserId",
                table: "CouponRedemptions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CouponRedemptions_Orders_OrderId",
                table: "CouponRedemptions",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CouponRedemptions_Users_UserId",
                table: "CouponRedemptions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Returns_Users_UserId",
                table: "Returns",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CouponRedemptions_Orders_OrderId",
                table: "CouponRedemptions");

            migrationBuilder.DropForeignKey(
                name: "FK_CouponRedemptions_Users_UserId",
                table: "CouponRedemptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds");

            migrationBuilder.DropForeignKey(
                name: "FK_Returns_Users_UserId",
                table: "Returns");

            migrationBuilder.DropIndex(
                name: "IX_CouponRedemptions_OrderId",
                table: "CouponRedemptions");

            migrationBuilder.DropIndex(
                name: "IX_CouponRedemptions_UserId",
                table: "CouponRedemptions");

            migrationBuilder.DropColumn(
                name: "MaxDiscount",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "UsageLimit",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "Usage",
                table: "Coupons",
                newName: "UseageLimit");

            migrationBuilder.RenameColumn(
                name: "RedeemedAt",
                table: "CouponRedemptions",
                newName: "RedeemAt");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "CouponRedemptions",
                newName: "OrederId");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "ContactMessages",
                newName: "CreateAt");

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "MinOrder",
                table: "Coupons",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Coupons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Useage",
                table: "Coupons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Users_UserId",
                table: "Refunds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Returns_Users_UserId",
                table: "Returns",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
