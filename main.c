#include <stdio.h>
#include <string.h>

struct Component
{
    int id;
    char name[30];
    char type[20];
    float ratedValue;
    float measuredValue;
    char result[10];
};

struct Component components[100];
int count = 0;

void addComponent()
{
    printf("\nEnter Component ID: ");
    scanf("%d", &components[count].id);

    printf("Enter Component Name: ");
    scanf("%s", components[count].name);

    printf("Enter Component Type: ");
    scanf("%s", components[count].type);

    printf("Enter Rated Value: ");
    scanf("%f", &components[count].ratedValue);

    printf("Enter Measured Value: ");
    scanf("%f", &components[count].measuredValue);

    /* Checking 5%% tolerance */
    float difference;

    difference = components[count].measuredValue -
                 components[count].ratedValue;

    if (difference < 0)
    {
        difference = -difference;
    }

    if (difference <= components[count].ratedValue * 0.05)
    {
        strcpy(components[count].result, "PASS");
    }
    else
    {
        strcpy(components[count].result, "FAIL");
    }

    count++;

    printf("\nComponent added successfully!");
    printf("\nTest Result: %s\n", components[count - 1].result);
}

void viewComponents()
{
    int i;

    if (count == 0)
    {
        printf("\nNo components available.\n");
        return;
    }

    printf("\n========== COMPONENT DETAILS ==========\n");

    for (i = 0; i < count; i++)
    {
        printf("\nComponent %d\n", i + 1);
        printf("ID              : %d\n", components[i].id);
        printf("Name            : %s\n", components[i].name);
        printf("Type            : %s\n", components[i].type);
        printf("Rated Value     : %.2f\n", components[i].ratedValue);
        printf("Measured Value  : %.2f\n", components[i].measuredValue);
        printf("Test Result     : %s\n", components[i].result);
    }
}

void searchComponent()
{
    int id;
    int i;
    int found = 0;

    printf("\nEnter Component ID to search: ");
    scanf("%d", &id);

    for (i = 0; i < count; i++)
    {
        if (components[i].id == id)
        {
            printf("\nComponent Found!\n");
            printf("ID              : %d\n", components[i].id);
            printf("Name            : %s\n", components[i].name);
            printf("Type            : %s\n", components[i].type);
            printf("Rated Value     : %.2f\n", components[i].ratedValue);
            printf("Measured Value  : %.2f\n", components[i].measuredValue);
            printf("Test Result     : %s\n", components[i].result);

            found = 1;
            break;
        }
    }

    if (found == 0)
    {
        printf("\nComponent not found.\n");
    }
}

int main()
{
    int choice;

    while (1)
    {
        printf("\n\n============================================");
        printf("\n ELECTRONIC COMPONENT TESTING SYSTEM");
        printf("\n============================================");

        printf("\n1. Add Component");
        printf("\n2. View Components");
        printf("\n3. Search Component");
        printf("\n4. Exit");

        printf("\n\nEnter your choice: ");
        scanf("%d", &choice);

        switch (choice)
        {
            case 1:
                addComponent();
                break;

            case 2:
                viewComponents();
                break;

            case 3:
                searchComponent();
                break;

            case 4:
                printf("\nThank you!\n");
                return 0;

            default:
                printf("\nInvalid choice. Try again.\n");
        }
    }

    return 0;
}